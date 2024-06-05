import cl from './warning.module.scss'

interface Props {
    title: string
}

function WarningTitle({ title }: Props) {
    return (
        <p className={cl.title}>{title}</p>
    );
}

export default WarningTitle;