import React from "react";
import { useParams } from 'react-router-dom';

const InventarioView = () => {
    const { id } = useParams();

    return <div>
        <h1>Ver Inventario {id}</h1>
    </div>;
};

export default InventarioView;