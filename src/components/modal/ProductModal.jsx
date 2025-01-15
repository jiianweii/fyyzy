import styled, { css } from "styled-components";
import { useModalContext } from "../../Provider/ModalProvider";
import { useState } from "react";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../../services/apiProduct";
import toast from "react-hot-toast";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getAuctions } from "../../services/apiAuction";
import { getCategory } from "../../services/apiCategory";
import Loader from "../../ui/Loader";
import { convertDate } from "../helper/helper";

const FullScreen = styled.div`
  height: 100%;
  width: 100%;

  background-color: #00000080;
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 4.2rem 3rem;
  gap: 1rem;
  width: 30%;
  height: 80%;
  overflow-y: auto;

  position: relative;

  & input,
  & select {
    width: 80%;
    padding: 0.4rem;
    border: 1px solid #000;
  }
`;

const CloseBtn = styled.button`
  color: #000;
  border: none;
  background: none;

  position: absolute;
  cursor: pointer;
  top: 10px;
  right: 15px;

  font-weight: 600;
`;

const FormHeader = styled.div`
  width: 100%;
  margin-top: 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  & h1 {
    font-size: 1rem;

    color: #3c3c3c;
  }
`;

const FormRow = styled.div`
  display: flex;
  align-items: ${(props) => props.ai || "center"};
  gap: ${(props) => props.gap};
  justify-content: ${(props) => props.jc || "space-between"};
`;

const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & textarea {
    resize: none;
    padding: 0.5rem;
  }
`;

const FormImages = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;

  gap: 0.5rem;
  & input {
    border: none;
  }

  & button {
    padding: 0.5rem;

    border: none;
    border-radius: 8px;
    background-color: #c7c7c7;
  }
`;

const FormTitle = styled.div`
  text-align: center;
  font-weight: 700;
  font-size: 1.5rem;
`;

const Button = styled.button`
  color: #fff;
  font-weight: 600;
  padding: 1rem;
  border: none;
  border-radius: 12px;
  ${(props) =>
    props.type == "delete" &&
    css`
      background-color: #c54949;
    `}
  ${(props) =>
    props.type == "update" &&
    css`
      background-color: #4a8ef3;
    `}
`;

const ProductImage = styled.img`
  height: 75px;
  width: 75px;
`;

export default function ProductModal() {
  const { setIsOpenModal, selectedProduct, setSelectedProduct } =
    useModalContext();
  const [product, setProduct] = useState(selectedProduct ?? {});
  const [imageNum, setImageNum] = useState(product?.images?.length || 1);
  const [productType, setProductType] = useState("");

  const getSelect = async () => {
    const auctions = await getAuctions();
    const categories = await getCategory();

    return { auctions, categories };
  };

  const { data, isPending } = useQuery({
    queryKey: ["category", "auction"],
    queryFn: getSelect,
  });

  function handleOnChangeType(value) {
    setProduct((prev) => {
      let updated = { ...prev };
      if (value == "Auction") {
        delete updated.tradeOffer;
        delete updated.price;
      }
      if (value == "Buynow") {
        delete updated.biddingPrice;
        delete updated.tradeOffer;
        delete updated.auction;
      }
      if (value == "Trade") {
        delete updated.price;
        delete updated.biddingPrice;
        delete updated.auction;
      }

      return updated;
    });
  }

  function handleOnChange(e, type) {
    if (type == "images") {
      setProduct((prev) => {
        const images = prev.images
          ? [...product.images, e.target.files[0]]
          : [e.target.files[0]];

        return {
          ...product,
          images,
        };
      });
      return;
    }

    setProduct({ ...product, [type]: e.target.value });
  }

  function handleDeletion() {
    deleteProduct(product.id);
    toast.success("You have successfully deleted the product");
    setProduct({});
    setSelectedProduct({});
    setIsOpenModal(false);
  }

  function handleSubmitForUpdate(e) {
    e.preventDefault();

    if (
      product.name &&
      product.category &&
      product.description &&
      product.type &&
      (product.tradeOffer || product.price || product.biddingPrice)
    ) {
      const data = updateProduct(product);

      if (data) {
        toast.success("You have successfully updated the product");
        setProduct({});
        setSelectedProduct({});
        setIsOpenModal(false);
      }
    }
  }

  function handleSubmitForCreate(e) {
    e.preventDefault();

    if (
      product.name &&
      product.category &&
      product.description &&
      product.type &&
      (product.tradeOffer || product.price || product.biddingPrice)
    ) {
      const data = createProduct(product);

      if (data) {
        toast.success("You have successfully created a product");
        setProduct({});
        setSelectedProduct({});
        setIsOpenModal(false);
      }
    }
  }

  if (isPending) return <Loader />;

  return (
    <FullScreen
      id="fullscreen"
      onClick={(e) => {
        if (e.target.id == "fullscreen") {
          setProduct({});
          setSelectedProduct({});
          setIsOpenModal(false);
        }
      }}
    >
      <Form
        onSubmit={
          selectedProduct?.name ? handleSubmitForUpdate : handleSubmitForCreate
        }
      >
        <CloseBtn
          onClick={(e) => {
            e.preventDefault();
            setSelectedProduct({});
            setIsOpenModal(false);
          }}
        >
          X
        </CloseBtn>
        <FormTitle>
          {selectedProduct?.name ? "UPDATE PRODUCT" : "CREATE PRODUCT"}
        </FormTitle>
        <FormHeader>
          <h1>BASIC INFORMATION</h1>
        </FormHeader>
        <FormRow>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={product.name}
            onChange={(e) => handleOnChange(e, "name")}
          />
        </FormRow>
        <FormRow ai="flex-start">
          <label htmlFor="images">Images:</label>
          <FormImages>
            {Array.from(Array(imageNum)).map((_, image) => {
              if (selectedProduct.images?.[image])
                return <ProductImage src={selectedProduct.images[image]} />;
              else
                return (
                  image < 5 && (
                    <input
                      type="file"
                      key={image}
                      accept="image/png, image/jpeg"
                      onChange={(e) => handleOnChange(e, "images")}
                    />
                  )
                );
            })}
            {imageNum < 5 && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setImageNum(imageNum + 1);
                }}
              >
                Add More Images
              </button>
            )}
          </FormImages>
        </FormRow>
        <FormRow>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            onChange={(e) => handleOnChange(e, "category")}
            defaultValue={product.category || "select"}
          >
            <option value="select" disabled>
              Please Select One:
            </option>
            {data.categories.map((option) => {
              return <option value={option.name}>{option.name}</option>;
            })}
          </select>
        </FormRow>
        <FormRow>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={product.description}
            onChange={(e) => handleOnChange(e, "description")}
          />
        </FormRow>
        <FormRow>
          <label htmlFor="productType">Type of Product:</label>
          <select
            id="productType"
            defaultValue={product.type || "select"}
            onChange={(e) => {
              handleOnChange(e, "type");
              setProductType(e.target.value);
              handleOnChangeType(e.target.value);
            }}
          >
            <option value="select" disabled>
              Please Select One:
            </option>
            <option value="Trade">Trade</option>
            <option value="Auction">Auction</option>
            <option value="Buynow">Buy Now</option>
          </select>
        </FormRow>
        {(product.type == "Trade" || productType == "Trade") && (
          <>
            <FormHeader>
              <h1>TYPE OF PRODUCT (TRADE)</h1>
            </FormHeader>
            <FormColumn>
              <label htmlFor="looking">
                Looking For: (Please Add ',' OR comma after each item)
              </label>
              <textarea
                id="looking"
                value={product.tradeOffer}
                onChange={(e) => handleOnChange(e, "tradeOffer")}
              />
            </FormColumn>
          </>
        )}
        {(product.type == "Auction" || productType == "Auction") && (
          <>
            <FormHeader>
              <h1>TYPE OF PRODUCT (AUCTION)</h1>
            </FormHeader>
            <FormRow>
              <label htmlFor="auction">Auction:</label>
              <select
                id="auction"
                defaultValue={product.auction || "select"}
                onChange={(e) => handleOnChange(e, "auction")}
              >
                <option value="select" disabled>
                  Please Select One:
                </option>
                {data.auctions.map((auction) => {
                  return (
                    <option value={auction.id}>
                      {auction.name} ({convertDate(auction.startDate)} to{" "}
                      {convertDate(auction.endDate)})
                    </option>
                  );
                })}
              </select>
            </FormRow>
            <FormRow>
              <label htmlFor="biddingPrice">Bidding Price:</label>
              <input
                type="number"
                id="biddingPrice"
                value={product.biddingPrice}
                onChange={(e) => handleOnChange(e, "biddingPrice")}
              />
            </FormRow>
          </>
        )}
        {(product.type == "Buynow" || productType == "Buynow") && (
          <>
            <FormHeader>
              <h1>TYPE OF PRODUCT (Buy Now)</h1>
            </FormHeader>
            <FormRow>
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                value={product.price}
                onChange={(e) => handleOnChange(e, "price")}
              />
            </FormRow>
          </>
        )}
        <FormRow jc="center" gap="2rem">
          {selectedProduct?.name && (
            <Button type="delete" onClick={handleDeletion}>
              Delete Product
            </Button>
          )}

          <Button type="update">
            {selectedProduct?.name ? "Update Product" : "Create Product"}
          </Button>
        </FormRow>
      </Form>
    </FullScreen>
  );
}
