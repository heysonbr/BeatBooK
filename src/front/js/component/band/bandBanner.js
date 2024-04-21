import React, { useRef, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Context } from '../../store/appContext';
import { useNavigate } from 'react-router-dom';
import "../band/Bandstyle.css"
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({


    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(0.2),
        },
    },
}));

export const BandBanner = (props) => {
    const { id } = useParams();
    const { actions, store } = useContext(Context);
    const [bandData, setbandData] = useState(null);
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isImageSelected, setIsImageSelected] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [formData, setFormData] = useState({
        description: '',
        profile_picture: '',
        banner_picture: '',
        instagram: '',
        tiktok: '',
    });

    useEffect(() => {
        actions.getBand(id).then((data) => {
            setbandData(data);
            console.log("bandData", data);
        });
    }, [id]);


    const handleBannerChange = async (e) => {
        setIsLoading(true);
        const file = e.target.files[0];

        // Pasa el ID del evento al método uploadEventPicture
        const data = await actions.uploadBannerBand(file, id);

        if (data) {
            const bannerUrl = data.url;
            setIsImageSelected(true);
            toast.success("Imagen subida con éxito");
        } else {
            console.error("Error uploading image");
            toast.error("Error al subir la imagen");
        }
        setIsLoading(false);
    };

    const handleFileChange = async (e) => {
        setIsLoading(true);
        const file = e.target.files[0];

        // Pasa el ID del evento al método uploadEventPicture
        const data = await actions.uploadBandPicture(file, id);

        if (data) {
            const imageUrl = data.url;
            setIsImageSelected(true);
            toast.success("Imagen subida con éxito");
        } else {
            console.error("Error uploading image");
            toast.error("Error al subir la imagen");
        }
        setIsLoading(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/bands/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            handleClose(); // Cierra el modal después de enviar el formulario

            // Actualizar datos de usuario en el estado de la aplicación
            const updatedBandResponse = await fetch(`${process.env.BACKEND_URL}/api/bands/${id}`);
            const updatedBandData = await updatedBandResponse.json();
            actions.getBand(id)
            toast.success("Cambios guardados con éxito");
        } catch (error) {
            // Manejar errores de solicitud
            console.error('Error al enviar el formulario:', error);
            toast.error("Error al guardar los cambios");
        }
    };

    const classes = useStyles();

    return (
        <div className='container'>
            <div className='banner-band'>
                <img src={store.band.banner_picture} className='img-fluid' alt='Banner'></img>
            </div>
            <div className="container container text-start data">
                <div className="row align-items-center">
                <div className="col-12 col-md-4 col-xl-2">
                        <div className='picture col-2'>
                            <img className='img' src={store.band.profile_picture} alt='Perfil' />
                        </div>
                    </div>
                    <div className="col-12 col-md-8 col-xl-4 d-flex align-items-center mx-3 ">
                        <h1>{store.band.name}</h1>
                        <button className='btns ms-3'
                       onClick={handleShow}>
                        <i className="fa-solid fa-user-pen" style={{ color: '#ffffff' }}></i>
                    </button>
                    </div>
                    <div className="col-12 col-md-12 col-xl-5 d-flex flex-column align-items-end justify-content-center my-3">
                        <div className='members'>
                            <p className='me-5 '><strong>Miembros</strong></p>
                        </div>
                        <div className="d-flex flrex-row">
                            {store.band.members && store.band.members.map((member, index) => (
                                <div className={classes.root} key={index}>
                                    <Link to={`/profile/${member.id}`}>
                                        <Avatar className="avatar" alt={member.username} src={member.profile_image_url} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="container text-center">
                <div className="row">
                    <div className="col">
                        <div className="cardContent">
                            <h5 className="card-title">Detalles</h5>
                            <p className="card-text">{store.band.description}</p>
                            <h5>Redes sociales</h5>
                            <div className='social-network'>
                                <a href={store.band.instagram} className="card-link" target='_blank'> <i className="fa-brands  fa-instagram icono fa-2xl"></i></a>
                                <a href={store.band.tiktok} className="card-link" target='_blank'><i className="fa-brands fa-tiktok icono fa-2xl"></i></a>
                            </div>
                        </div>
                        <div className="cardContent">
                            <h5>Categoria musical</h5>
                            <button className="btns-music">
                                <i className="fas fa-music mx-1" style={{ color: '#FFFFFF' }}></i>
                                {store.band.musical_categories && store.band.musical_categories.map(category => (
                                    <span key={category.id}>{category.name}</span>
                                ))}
                            </button>
                        </div>
                    </div>
                    <div className="col">
                        <div className="cardContent">
                            <h5>Proximos Eventos</h5>
                        </div>
                        <div className="cardContent card mb-3">
                            {store.band.events && store.band.events.map((event, index) => (
                                <div className="position-relative" key={index}>
                                    <Link to={`/events/${event.id}`}>
                                        <img src={event.picture_url} alt="img" draggable="false" className="card-img-top eventPicture" />
                                    </Link>
                                    <div className="card-body">
                                        <h5>{event.name}</h5>
                                        <p>{event.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal para editar Información */}
            <Modal show={show} onHide={handleClose} onSubmit={handleSubmit} className="custom-modal">
                    <Modal.Header closeButton>
                        <Modal.Title className='modal-title'>Editar perfil</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='bg-modal'>
                        <div className='edit-image'>
                            <div className='image-title'>
                                <h6>Foto de perfil</h6>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    accept="image/*"

                                />
                            </div>
                            <div className='modal-img'>
                                <img className='img' src={store.band.profile_picture} alt='perfil' />
                            </div>
                            {isLoading && <div className="text-center pt-2">
                                <div className="spinner-border" style={{ width: '2rem', height: '2rem' }} role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>}
                        </div>
                        <div className='edit-banner'>
                            <div className='image-title'>
                                <h6>Foto de portada</h6>
                                <input
                                    type="file"
                                    onChange={handleBannerChange}
                                    accept="image/*"
                                />
                            </div>

                            <div className='banner-img'>
                                <img src={store.band.banner_picture} className="img-fluid" alt="fotoBanner" />
                            </div>
                        </div>
                        <form onSubmit={e => handleSubmit(e)}>
                            <div className='edit-info'>
                                <div className='edit-detail'>
                                    <div className='image-title'>
                                        <h6>Detalles</h6>
                                    </div>
                                    <div className='modal-detail'>
                                        <textarea name='description' value={formData.description} onChange={handleChange}></textarea>
                                    </div>
                                </div>
                                <div className='image-title'>
                                    <h6>Información</h6>
                                </div>
                                <div className='modal-info'>
                                    <div className="inputGroup">
                                        <input placeholder="Instagram" className="input" name="instagram" type="text" value={formData.instagram} onChange={handleChange} />
                                        <input placeholder="Tiktok" className="input" name="tiktok" type="text" value={formData.tiktok} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                            <Modal.Footer>
                                <Button className='btns' type="submit">Guardar cambios</Button>
                            </Modal.Footer>
                        </form>
                    </Modal.Body>
                </Modal>
        </div>
    );
}
