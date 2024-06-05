import { useContext, useEffect, useState } from "react";
import { InputFieldUI, InputNumbersFieldUI } from "../../../ui/auth/Fields/FieldsUI";
import Chapter from "../../../ui/titles/chapter";
import Content from "../../../universalCom/Content";

import cl from './styles/style.module.scss'
import ButtonUI from "../../../ui/buttons/ButtonUI";
import useFetchingWithData from "../../../hooks/useFetchingWithData";
import GlobalServices from "../../../API/global/GlobalServices";
import { cleaner } from "../../../../types/ProductType";
import { RouterContext } from "../../../../Router";
import LoaderAnimation from "../../../animations/ui/loaders/LoaderAnimation";
import { useSelector } from "react-redux";

function CreateProductModule() {
    const access = useSelector((item: any) => item.verifedToken.verifed_token)
    const router = useContext(RouterContext)
    const [selectedFiles, setSelectedFiles] = useState<(any | null)>(null)
    const [titleValue, setTitleValue] = useState<string>("")
    const [textValue, setTextValue] = useState<string>("")
    const [priceValue, setPriceValue] = useState<number>(NaN)

    const [titleErr, setTitleErr] = useState<string>("")
    const [textErr, setTextErr] = useState<string>("")
    const [fileErr, setFileErr] = useState<string>("")
    const [priceErr, setPriceErr] = useState<string>("")

    const MAX_TITLE_LENGTH = 50;
    const MIN_TITLE_LENGTH = 4;

    const MAX_TEXT_LENGTH = 100;
    const MIN_TEXT_LENGTH = 10;


    const [send, isLoading, error] = useFetchingWithData(async (data) => {
        const response = await GlobalServices.PostProduct(data)
        if (response.data.code == 0) {
            cleaner(setTitleValue, setTextValue, setPriceValue)
            setSelectedFiles(null)
        }
    })


    const PreSend = () => {
        cleaner(setFileErr, setTitleErr, setTextErr)
        let counter = 0
        const formData = new FormData();
        if (selectedFiles) {
            if (selectedFiles.type === 'image/png' || selectedFiles.type === 'image/jpeg') {
                if (selectedFiles.size <= 1 * 1024 * 1024) {
                    counter++
                } else setFileErr("Please choose file size up to 1MB")
            } else setFileErr("Please .PNG or .JPG format")
        } else setFileErr("Please select file")
        if (titleValue.length >= MIN_TITLE_LENGTH && titleValue.length <= MAX_TITLE_LENGTH) {
            counter++
        } else setTitleErr(`The number of characters should be between ${MIN_TITLE_LENGTH} and ${MAX_TITLE_LENGTH}`)
        if (textValue.length >= MIN_TEXT_LENGTH && textValue.length <= MAX_TEXT_LENGTH) {
            counter++
        } else setTextErr(`The number of characters should be between ${MIN_TEXT_LENGTH} and ${MAX_TEXT_LENGTH}`)
        if (priceValue > 0) {
            counter++
        } else setPriceErr("Enter price")
        if (counter >= 4) {
            formData.append('file', selectedFiles);
            formData.append('title', titleValue);
            formData.append('text', textValue);
            formData.append('price', String(priceValue))
            send(formData)
        }
    }

    return (
        <Content loading={isLoading}>
            {access == "Loading" ?
                <div className={cl.anim}>
                    <LoaderAnimation />
                </div>
                : (access == "True" ?
                    <>
                        <Chapter title="Create new product" />
                        <div className={cl.form}>
                            <InputFieldUI errorText={titleErr} setValue={setTitleValue} value={titleValue} label="Title" placeholder="title of your product" />
                            <InputFieldUI errorText={textErr} setValue={setTextValue} value={textValue} label="Text" placeholder="some text about product" />
                            <InputNumbersFieldUI errorText={priceErr} setValue={setPriceValue} value={priceValue} label="Price" placeholder="price" />
                            <div className={cl.inputFile}>
                                <p className={cl.inputFile_p1}>Image</p>
                                <input type='file' onChange={(e) => { setSelectedFiles(e.target.files && e.target.files[0]) }}></input>
                                <p className={cl.inputFile_p2}>{fileErr}</p>
                            </div>
                            <div className={cl.form_actions}>
                                <ButtonUI onClick={PreSend} title="Create product" />
                            </div>
                        </div>
                    </>
                    :
                    <div>No access</div>

                )

            }
        </Content>
    );
}

export default CreateProductModule;