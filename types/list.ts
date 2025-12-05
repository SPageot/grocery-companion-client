export type ListProps = {
  _id: any;
  createdAt: Date;
  listItems: string[];
  title: string;
  userId: string;
};

export type  UserListProps = {
  handleListItemChange:(text:string) => void;
  listItem: string;
  onAddToList:() => void;
  list:string[];
  onRemoveListItemPress:(item:string) => void;
  onModal?:() => void;
  onModifyPress?:() => void
}

export type UserListTitleProps = {
  visible:boolean;
  onRequestClose:() => void
  onChangeTitleText:(text:string) => void
  listTitle: string
  onCancelPress:() => void
  onSubmitList:() => void
}
