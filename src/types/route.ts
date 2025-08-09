import type {ReactNode} from 'react';

export type TRoute = {
	path?: string;
	element: ReactNode;
};

export type TUserPath = {
	name?: string;
	path?: string;
	element?: ReactNode;
	children?: TUserPath[];
};

export type TSidebarItem =
	| {
			key?: string;
			label: ReactNode;
			children?: TSidebarItem[];
	  }
	| undefined;
export type MenuItemType = {
	label: string;
	key: string;
	icon?: React.ReactNode;
};
