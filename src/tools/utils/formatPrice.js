function formatPrice(price) {
    return price.toFixed(2).replace(".", ",");
}

export default formatPrice;