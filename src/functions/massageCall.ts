import { setMassage } from "../store/reducers/massage";



export default function MassageCall(text: string, dispatch: any) {
    dispatch(setMassage({
        text: text,
        show: true
    }))
}