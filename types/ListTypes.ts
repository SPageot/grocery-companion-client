
export interface GroceryItemProps {
    name: string;
    quantity: number;
    isCompleted: boolean
}

export interface GroceryListProps {
    _id?: string,
    userId: string,
    title: string,
    listItems: [GroceryItemProps],
}