import Map "mo:core/Map";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  type Category = {
    #mens;
    #womens;
    #unisex;
  };

  type Product = {
    id : Nat;
    name : Text;
    price : Nat;
    category : Category;
    description : Text;
  };

  var nextProductId = 1;

  let products = Map.empty<Nat, Product>();
  let featuredProducts = List.empty<Nat>();

  type CartItem = {
    productId : Nat;
    quantity : Nat;
  };

  let carts = Map.empty<Principal, List.List<CartItem>>();

  module Product {
    public func compare(p1 : Product, p2 : Product) : Order.Order {
      switch (Text.compare(p1.name, p2.name)) {
        case (#equal) { Nat.compare(p1.id, p2.id) };
        case (order) { order };
      };
    };
  };

  public shared ({ caller }) func addProduct(name : Text, price : Nat, category : Category, description : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };

    let product : Product = {
      id = nextProductId;
      name;
      price;
      category;
      description;
    };

    products.add(nextProductId, product);
    nextProductId += 1;
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    let productList = List.empty<Product>();
    for (product in products.values()) {
      productList.add(product);
    };
    productList.toArray().sort();
  };

  public shared ({ caller }) func addToCart(productId : Nat, quantity : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can manage cart");
    };

    if (quantity == 0) {
      Runtime.trap("Cannot add zero quantity to cart");
    };

    if (not (products.containsKey(productId))) {
      Runtime.trap("Product does not exist");
    };

    let cart = switch (carts.get(caller)) {
      case (null) { List.empty<CartItem>() };
      case (?existingCart) { existingCart };
    };

    cart.add({ productId; quantity });
    carts.add(caller, cart);
  };

  public query ({ caller }) func getCart() : async [CartItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view cart");
    };

    switch (carts.get(caller)) {
      case (null) { [] };
      case (?cart) { cart.toArray() };
    };
  };

  public shared ({ caller }) func clearCart() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can manage cart");
    };

    carts.remove(caller);
  };

  public shared ({ caller }) func setFeaturedProducts(productIds : [Nat]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can set featured products");
    };

    featuredProducts.clear();
    for (id in productIds.values()) {
      featuredProducts.add(id);
    };
  };

  public query ({ caller }) func getFeaturedProducts() : async [Product] {
    let featuredList = List.empty<Product>();
    for (id in featuredProducts.values()) {
      switch (products.get(id)) {
        case (?product) { featuredList.add(product) };
        case (null) {};
      };
    };
    featuredList.toArray();
  };
};
