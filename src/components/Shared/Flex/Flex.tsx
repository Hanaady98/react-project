import { FlexAligns } from "../../enums/FlexAligns";
import { FlexDirections } from "../../enums/FlexDirections";

type FlexProps = {
    children: React.ReactNode;
    direction?: FlexDirections,
    justify?: FlexAligns,
    items?: FlexAligns,
    className?: string
};

const Flex = (props: FlexProps) => {

    const { children, direction, justify, items, className } = props;

    return (
        <div className={`flex flex-${direction} justify-${justify} items-${items} ${className}`}>{children}</div>
    )
};

export default Flex;