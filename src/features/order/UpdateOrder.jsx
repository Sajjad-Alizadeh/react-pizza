import {useFetcher} from "react-router-dom";
import Button from "../../ui/Button.jsx";
import {updateOrder} from "../../services/apiRestaurant.js";

function UpdateOrder() {
    const fetcher = useFetcher()
    const isLoading = fetcher.state === "loading"
    return (
        <fetcher.Form method="patch" className="text-right">
            <Button type="primary" disabled={isLoading}>
                {isLoading ? "Make priority..." : "Make priority"}
            </Button>
        </fetcher.Form>
    )
}

export default UpdateOrder

export async function action({params}) {
    const orderId = params.orderId
    const data = {priority: true}
    await updateOrder(orderId, data)
    return null
}