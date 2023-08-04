/* async getSubdomainByProductId(productId: number) {
    const subdomain = await axios({
      method: 'get',
      url: `https://club-api.hotmart.com/hot-club-api/rest/v3/membership/subdomain/${productId}?productId=${productId}`,
    })
      .then(async (res) => {
        return res.data;
      })
      .catch((err) => console.log(err));

    return subdomain;
  } */
