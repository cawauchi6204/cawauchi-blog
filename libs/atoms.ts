import { atom, PrimitiveAtom } from 'jotai'

type Tocs = {
	id: string
	name: string
	text: string
}[]

export const tocAtom: PrimitiveAtom<
	{
		id: string
		name: string
		text: string
	}[]
> = atom([
	{
		id: '',
		name: '',
		text: '',
	},
])

export const loadingAtom: PrimitiveAtom<boolean> = atom(false)
