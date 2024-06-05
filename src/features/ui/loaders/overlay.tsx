import cl from './loaders.module.scss'

interface OverlayProps {
    loading?: boolean;
}

function Overlay(props: OverlayProps) {

    return (props.loading ?
        <div className={cl.overlay}>

        </div>
        :
        null
    );
};
export default Overlay