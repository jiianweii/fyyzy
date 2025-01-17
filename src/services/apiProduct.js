import { getCurrentUser } from "./apiAuth";
import { getOffer } from "./apiOffer";
import supabase from "./supabase";

export const getProducts = async (limit) => {
  let { data: products, error } = await supabase
    .from("products")
    .select("*")
    .neq("isSold", true)
    .limit(limit);

  if (error) {
    console.error(error);
  }

  return products;
};

export const getProductsByFilter = async ({
  type,
  auction_id,
  category,
  searchSort,
  limit,
  categories,
  value,
}) => {
  let auction = supabase.from("auctions").select("*").neq("isEnded", true);
  let products = supabase.from("products").select("*").neq("isSold", true);

  if (categories) {
    products = products.in("category", categories);
  }

  if (category && category == "All Categories") {
    products = products.limit(limit);
  }

  if (category && category != "All Categories") {
    products = products.eq("category", category).limit(limit);
  }

  if (value) {
    products = products.ilike("name", `%${value}%`);
  }

  if (limit) {
    products = products.limit(limit);
  }

  if (type == "auction") {
    auction = auction.eq("id", auction_id);
    products = products.eq("auction", auction_id);
  } else {
    products = products.neq("type", "Auction");
  }

  if (searchSort?.value) {
    if (searchSort.ascending) {
      products = products.order(searchSort.value, { ascending: true });
    } else {
      products = products.order(searchSort.value, { ascending: false });
    }
  }

  let { data: selectedAuction, error: aucError } = await auction;
  let { data: selectedProducts, error } = await products;

  if (error || aucError) {
    throw new Error(error.message || aucError.message);
  }

  return { auction: selectedAuction, products: selectedProducts };
};

export const getProductsByCurrentSelection = async (curr_id, id) => {
  let { data: products, error } = await supabase
    .from("products")
    .select("*")
    .neq("id", curr_id)
    .neq("isSold", true)
    .eq("created_by", id)
    .limit(5);

  if (error) {
    console.error(error);
  }

  return products;
};

export const getProductsByCreator = async (sortBy) => {
  let { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  let allProducts = supabase
    .from("products")
    .select("*")
    .eq("created_by", data.user.email);

  if (sortBy?.[0]) {
    if (sortBy[1] == "asc") {
      allProducts = allProducts.order(sortBy[0], { ascending: true });
    } else {
      allProducts = allProducts.order(sortBy[0], { ascending: false });
    }
  }

  let { data: products, error: prodError } = await allProducts;

  if (prodError) throw new Error(prodError.message);

  return products;
};

export const getProductById = async (id) => {
  let { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id);

  if (error) throw new Error(error.message);

  let offers = null;

  if (products[0].type == "Auction") {
    offers = await getOffer(id);
  }

  return { products, offers };
};

export const getProductsByAuctionId = async (id) => {
  let { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("auction", id);

  if (error) {
    console.error(error);
  }

  return products;
};

export const getProductsByCategory = async (id) => {
  let { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", id);

  if (error) {
    console.error(error);
  }

  return products;
};

export const uploadImages = async (image) => {
  console.log(image);
  if (typeof image == "string") {
    if (image.includes("mkaqsnyttxfwlrwnoeop") || image == "") {
      return image;
    }
  }
  const name = Math.random() + image.name;
  const { error } = await supabase.storage
    .from("product-images")
    .upload(`${name}`, image);

  const { data } = supabase.storage
    .from("product-images")
    .getPublicUrl(`${name}`);

  if (error) {
    throw new Error(error.message);
  }

  return data.publicUrl;
};

export const deleteProduct = async (id) => {
  let { error } = await supabase.from("products").delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
};

export const updateProduct = async (product) => {
  const user = await getCurrentUser();
  const images = product.images;

  const imagesUrls = await Promise.all(
    images.map(async (t) => {
      return await uploadImages(t);
    })
  );

  let imageSize = imagesUrls.length;

  while (imageSize < 5) {
    imagesUrls.push("");
    imageSize++;
  }

  product.images = imagesUrls;
  product.tradeOffer = product?.tradeOffer?.split(",");
  product.created_by = user.email;

  let { data, error } = await supabase
    .from("products")
    .update(product)
    .eq("id", product.id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const createProduct = async (product) => {
  const user = await getCurrentUser();
  const images = product.images;

  const imagesUrls = await Promise.all(
    images.map(async (t) => {
      return await uploadImages(t);
    })
  );

  let imageSize = imagesUrls.length;

  while (imageSize < 5) {
    imagesUrls.push("");
    imageSize++;
  }

  product.images = imagesUrls;
  product.created_by = user.email;

  let { data, error } = await supabase.from("products").insert(product);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const completeTransaction = async (
  product_id,
  buyer_id,
  offer_id,
  chat_id
) => {
  let { error } = await supabase
    .from("products")
    .update({ isSold: true, sold_to: buyer_id })
    .eq("id", product_id);

  let { error: offerError } = await supabase
    .from("offers")
    .update({ status: "COMPLETED" })
    .eq("id", offer_id);

  if (error || offerError) throw new Error(error.message || offerError.message);
};
