import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '../ApiKeyFireBase';
import { css } from '../../../styled-system/css';  // Importar Panda CSS

function Usuarios() {
    const [nombreTS, setNombreTS] = useState(''); // Estado para el nombre de TS
    const [mainChart, setMainChart] = useState(''); // Estado para el nombre del main chart
    const [usuarios, setUsuarios] = useState([]); // Estado para almacenar la lista de usuarios

    // Función para cargar todos los usuarios al iniciar el componente
    const cargarUsuarios = async () => {
        const querySnapshot = await getDocs(collection(db, "usuarios"));
        setUsuarios(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };

    // Cargar todos los usuarios al iniciar el componente usando useEffect
    useEffect(() => {
        cargarUsuarios();
    }, []);

    // Función para agregar o actualizar un usuario
    const agregarUsuario = async () => {
        if (nombreTS !== '' && mainChart !== '') {
            const normalizedNombreTS = nombreTS.toLowerCase();  // Convertir nombre a minúsculas
            const querySnapshot = await getDocs(query(collection(db, "usuarios"), where("nombreTS", "==", normalizedNombreTS)));
            const existingUsers = querySnapshot.docs;

            if (existingUsers.length > 0) {
                // Si el usuario ya existe, incrementar el contador del primer registro
                const firstUser = existingUsers[0];
                const userRef = doc(db, "usuarios", firstUser.id);
                await updateDoc(userRef, {
                    contador: firstUser.data().contador + 1
                });
            } else {
                // Si el usuario no existe, agregarlo con un contador inicial de 1
                await addDoc(collection(db, "usuarios"), {
                    nombreTS: normalizedNombreTS,  // Guardar el nombre en minúsculas
                    mainChart: mainChart,
                    contador: 1
                });
            }

            setNombreTS(''); // Limpiar el input de nombreTS después de agregar
            setMainChart(''); // Limpiar el input de main chart después de agregar
            await cargarUsuarios(); // Recargar usuarios
        }
    };

    // Función para eliminar todos los usuarios con el mismo nombre
    const eliminarUsuario = async (nombreTS) => {
        const normalizedNombreTS = nombreTS.toLowerCase();  // Convertir nombre a minúsculas para la eliminación
        const querySnapshot = await getDocs(query(collection(db, "usuarios"), where("nombreTS", "==", normalizedNombreTS)));
        for (const doc of querySnapshot.docs) {
            await deleteDoc(doc.ref);
        }
        cargarUsuarios(); // Recargar usuarios después de eliminar
    };

    return (
        <div className={css({
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f4f4f9',
        })}>
            <div className={css({
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
                padding: '20px',
                maxWidth: '800px',
                width: '100%',
            })}>
                <table className={css({
                    width: '100%',
                    borderCollapse: 'separate',
                    borderSpacing: '0 15px',
                })}>
                    <thead>
                        <tr>
                            <th className={css({
                                textAlign: 'left',
                                fontSize: '1.1em',
                                paddingBottom: '10px',
                                color: '#333',
                                borderBottom: '2px solid #ddd',
                            })}>Nombre de TS</th>
                            <th className={css({
                                textAlign: 'left',
                                fontSize: '1.1em',
                                paddingBottom: '10px',
                                color: '#333',
                                borderBottom: '2px solid #ddd',
                            })}>Nombre del Main Chart</th>
                            <th className={css({
                                textAlign: 'left',
                                fontSize: '1.1em',
                                paddingBottom: '10px',
                                color: '#333',
                                borderBottom: '2px solid #ddd',
                            })}>Contador</th>
                            <th className={css({
                                textAlign: 'left',
                                fontSize: '1.1em',
                                paddingBottom: '10px',
                                color: '#333',
                                borderBottom: '2px solid #ddd',
                            })}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    value={nombreTS}
                                    onChange={(e) => setNombreTS(e.target.value)}
                                    placeholder="Nombre de TS"
                                    className={css({
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        border: '1px solid #ccc',
                                        fontSize: '1em',
                                    })}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={mainChart}
                                    onChange={(e) => setMainChart(e.target.value)}
                                    placeholder="Nombre del Main Chart"
                                    className={css({
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        border: '1px solid #ccc',
                                        fontSize: '1em',
                                    })}
                                />
                            </td>
                            <td></td>
                            <td>
                                <button
                                    onClick={agregarUsuario}
                                    className={css({
                                        backgroundColor: '#4CAF50',
                                        color: 'white',
                                        padding: '10px 20px',
                                        fontSize: '1em',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                    })}
                                >
                                    Agregar Usuario
                                </button>
                            </td>
                        </tr>
                        {usuarios.map((usuario) => (
                            <tr 
                                key={usuario.id} 
                                className={css({
                                    backgroundColor: usuario.contador >= 5 ? '#FFCCCC' : 'transparent',  // Fondo rojo si contador >= 5
                                    borderBottom: '1px solid #ddd',
                                    position: 'relative',
                                })}
                            >
                                <td className={css({ padding: '10px', position: 'relative' })}>
                                    {usuario.nombreTS}
                                    {usuario.contador >= 5 && (
                                        <button
                                            className={css({
                                                position: 'absolute',
                                                top: '10px',
                                                right: '10px',
                                                backgroundColor: '#FF0000',
                                                color: 'white',
                                                padding: '5px',
                                                fontSize: '0.8em',
                                                borderRadius: '3px',
                                                cursor: 'pointer',
                                            })}
                                        >
                                            Posible Spy
                                        </button>
                                    )}
                                </td>
                                <td className={css({ padding: '10px' })}>{usuario.mainChart}</td>
                                <td className={css({ padding: '10px' })}>{usuario.contador}</td>
                                <td className={css({ padding: '10px' })}>
                                    <button
                                        onClick={() => eliminarUsuario(usuario.nombreTS)}
                                        className={css({
                                            backgroundColor: '#FF0000',
                                            color: 'white',
                                            padding: '5px 10px',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                        })}
                                    >
                                        Eliminar Todos
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Usuarios;
