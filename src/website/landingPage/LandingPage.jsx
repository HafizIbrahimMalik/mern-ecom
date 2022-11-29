import UserNavbar from '../userNavbar/UserNavbar';
import { ProductCard } from './card/ProductCard';
import Categories from './slider/Categories';

export function LandingPage() {

    return <div style={{ backgroundColor:"rgb(100, 161, 167)" }}>
        <UserNavbar />
        <Categories />
        <ProductCard />
    </div>
}
export default LandingPage