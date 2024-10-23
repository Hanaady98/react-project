type TitleSectionProps = {
    title: string,
    p: string
};

const TitleSection = (props: TitleSectionProps) => {

    const { title, p } = props;

    return (
        <>
            <section className="flex flex-col pt-20 text-center dark:text-white place-items-center">
                <h1 style={{ fontSize: "2rem" }}> {title} </h1>
                <p style={{ fontSize: "1.5rem" }}>{p}</p>
            </section>
        </>
    )
};

export default TitleSection;