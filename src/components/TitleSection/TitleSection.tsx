type TitleSectionProps = {
    title: string,
    p: string
};

const TitleSection = (props: TitleSectionProps) => {

    const { title, p } = props;

    return (
        <>
            <section className="flex flex-col pt-20 text-center dark:text-white dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800 bg-gradient-to-r from-pink-100 to-pink-200 dark:bg-green-500 place-items-center">
                <h1 style={{ fontSize: "2rem" }}> {title} </h1>
                <p style={{ fontSize: "1.5rem" }}>{p}</p>
            </section>
        </>
    )
};

export default TitleSection;