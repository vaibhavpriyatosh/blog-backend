export interface createUserTs {
	email: string;
	mobile: string;
	password: string;
}

export interface checkUserTs {
	email?: string;
	mobile?: string;
	password: string;
}

export interface getUserModel {
	email?: string;
	mobile?: string;
}

export interface getUserTs extends getUserModel {
	password: string;
}

export interface returnId {
	id: number;
}

export interface returnIdPass {
	id: number;
	password: string;
}

export interface returnById {
	id: number;
	email: string;
	mobile: string;
}
