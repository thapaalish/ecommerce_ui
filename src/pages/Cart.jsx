import React from "react";
import CartTable from "../components/CartTable";
import OrderSummary from "../components/OrderSummary";
import { Box, Button } from "@mui/material";
import { useQuery } from "react-query";
import $axios from "../lib/axios.instance";
import Loader from "../components/Loader";
import NoCartItem from "../components/NoCartItem";

const Cart = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["get-cart-items"],
    queryFn: async () => {
      return await $axios.get("/cart/item/list");
    },
  });

  const cartItems = data?.data?.cartItems;
  const orderSummary = data?.data?.orderSummary;

  if (isLoading) {
    return <Loader />;
  }

  if (cartItems.length < 1) {
    return <NoCartItem />;
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100vw",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: "4rem", md: null },
          justifyContent: "space-around",
        }}
      >
        <CartTable cartItems={cartItems} />
        <OrderSummary orderSummary={orderSummary} />
      </Box>
    </>
  );
};

export default Cart;
