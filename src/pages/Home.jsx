import Banner from "../components/HomePage/Banner";
import HealthTipsBlog from "../components/HomePage/Blogs";
import CategoryCardSection from "../components/HomePage/Categories";
import Discount from "../components/HomePage/Discount";
import FeaturedProducts from "../components/HomePage/Featured";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <CategoryCardSection></CategoryCardSection>
            <Discount></Discount>
            <HealthTipsBlog></HealthTipsBlog>
            <FeaturedProducts></FeaturedProducts>
        </div>
    );
};

export default Home;