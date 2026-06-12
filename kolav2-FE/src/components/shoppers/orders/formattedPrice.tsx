interface IFormattedPrice {
    price: number;
    currency?: string;
    className?: string;
    color?: string;
    smallClassName?: string;
}

const FormattedPrice = ({ price, currency = "GHS", className, color = "#B87C16", smallClassName }: IFormattedPrice) => (
    <span style={{ color: color }} className={`${className} font-[700] text-[14px]`}>
        {currency} {price.toString().split(".")[0]}.<span className={`text-[10px] ${smallClassName}`}>{price.toString().split(".")[1].length === 2 ? price.toString().split(".")[1] : "00"}</span>
    </span>
)

export default FormattedPrice;