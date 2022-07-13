import { ReactElement } from "react"
import { DrChegueiHeader } from "../DrChegueiHeader/dr-cheguei-header"
import { DrForm } from "../DrForm/dr-form"


export const NewInstitutionFormPage = (): ReactElement => {
    return (
        <>
            <DrChegueiHeader
                subtitle="Insira suas informações!"
            />
            <DrForm />
        </>
    )
}