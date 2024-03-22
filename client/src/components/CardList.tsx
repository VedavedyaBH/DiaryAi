import { Card } from "./ProfileDisplayCard";

const CardsList = ({ data }: any) => {
    return (
        <div className="grid grid-cols-1 max-w-3xl justify-center m-auto">
            {data.map((item: any, index: any) => (
                <Card />
            ))}
        </div>
    );
};

export default CardsList;
