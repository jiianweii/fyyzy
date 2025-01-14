import { getAuctions } from "./apiAuction";
import { getCurrentUser } from "./apiAuth";
import { getCategory } from "./apiCategory";
import { getOffer } from "./apiOffer";
import supabase from "./supabase";

export const getProducts = async (limit) => {
  let { data: products, error } = await supabase
    .from("products")
    .select("*")
    .limit(limit);

  if (error) {
    console.error(error);
  }

  return products;
};

export const getProductsByCreator = async () => {
  let { data, error } = await supabase.auth.getUser();
  let { data: products, error: prodError } = await supabase
    .from("products")
    .select("*")
    .eq("created_by", data.user.email);

  if (error || prodError) throw new Error(error.message || prodError.message);

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
