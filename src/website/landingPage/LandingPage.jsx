import UserNavbar from '../userNavbar/UserNavbar';
import { ProductCard } from './card/ProductCard';
import Categories from './slider/Categories';

export function LandingPage() {

    return <>
        <UserNavbar />
        <Categories />
        <ProductCard />
    </>
}
export default LandingPage