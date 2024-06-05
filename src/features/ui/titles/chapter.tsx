import cl from './titles.module.scss'


interface Props {
    title: string
}
function Chapter({ title }: Props) {
    return (
        <p className={cl.chapter}>{title}</p>
    );
}

export default Chapter;