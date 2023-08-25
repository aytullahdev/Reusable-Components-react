export const RegulerList = ({
    items,
    resourceName,
    itemComponents: ItemComponents
}) => {
    return (
        <>
            {items.map((item, i) => {
                return <ItemComponents key={i} {...{ [resourceName]: item }} />
            })}
        </>
    )
}
