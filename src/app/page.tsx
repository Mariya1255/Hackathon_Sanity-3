'use client'

import Hero from "./components/hero";
import Offer from "./components/offer";
import FeaturedProducts from "./components/FeatureProducts";
import LatestProducts from "./components/Latest-Products";
import Unique from "./components/unique";
import TrendingProducts from "./components/trending-products";
import Discount from "./components/Discount";
import TopCategories from "./components/Top-Categories";
import BlogSection from "./components/BlogSection";
import Newslater from "./components/news-letter";

function Homepage(){
  return(
    <div>
      {/* Comment Section */}
      <Hero />
      {/* Feature Products */}
      <FeaturedProducts />
      <LatestProducts />
      <Offer />
      <Unique />
      <TrendingProducts />
      <Discount />
      <TopCategories />
      <Newslater />
      <BlogSection />
    </div>
  )
}

export default Homepage;