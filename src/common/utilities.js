// Common utilities functions
export const getName = (item) => {
    return (item?.firstName + item?.lastName) || '-';
}