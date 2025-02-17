import Banner from "../components/HomePage/Banner";
import HealthTipsBlog from "../components/HomePage/Blogs";
import CategoryCardSection from "../components/HomePage/Categories";
import CustomerReviews from "../components/HomePage/CustomerReviews";
import Discount from "../components/HomePage/Discount";
import FeaturedProducts from "../components/HomePage/Featured";
import {Helmet} from "react-helmet";
import Newsletter from "../components/HomePage/NewsLetter";
import RecentProducts from "../components/HomePage/RecentProducts";

const Home = () => {
    return (
        <div>
             <Helmet>
               
                <title>Home</title>
              
            </Helmet>

            <Banner></Banner>
            <CategoryCardSection></CategoryCardSection>
            <Discount></Discount>
            <RecentProducts></RecentProducts>            
            <FeaturedProducts></FeaturedProducts>
            <HealthTipsBlog></HealthTipsBlog>
            <Newsletter></Newsletter>
            <CustomerReviews></CustomerReviews>
          
        </div>
    );
};

export default Home;