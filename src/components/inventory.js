import { useEffect, useState } from "react";
import React from 'react';

import inventoryService from "../services/inventoryService";

function Inventory (){
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', category: '', quantity: 0 });
    const [editingItem, setEditingItem] = useState(null);

    useEffect(() => {
        fetchItems();
    }, []);
    const fetchItems = () => {
        inventoryService.getAllItems()
            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching items', error);
            });
    };
    const handleCreateItem = () => {
        inventoryService.createItem(newItem)
            .then(() => {
                fetchItems();
                setNewItem({ name: '', category: '', quantity: 0 });
            })
            .catch(error => {
                console.error('Error creating item', error);
            });
    };
    const handleUpdateItem = () => {
        if (!editingItem) return;
        inventoryService.updateItem(editingItem.id, editingItem)
            .then(() => {
                fetchItems();
                setEditingItem(null);
            })
            .catch(error => {
                console.error('Error updating item', error);
            });
    };

    const handleDeleteItem = (id) => {
        inventoryService.deleteItem(id)
            .then(() => {
                fetchItems();
            })
            .catch(error => {
                console.error('Error deleting item', error);
            });
    };

    const handleEditItem = (item) => {
        setEditingItem({ ...item });
    };

    const cancelEdit = () => {
        setEditingItem(null);
    };
    return(
        <>
           <div>
            <h2>Inventory Management</h2>
            <div>
                <h3>Add New Item</h3>
                <input
                    type="text"
                    placeholder="Name"
                    value={newItem.name}
                    onChange={(e) => setNewItem(prevState => ({ ...prevState, name: e.target.value }))}
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={newItem.category}
                    onChange={(e) => setNewItem(prevState => ({ ...prevState, category: e.target.value }))}
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem(prevState => ({ ...prevState, quantity: parseInt(e.target.value) }))}
                />
                <button onClick={handleCreateItem}>Add Item</button>
            </div>

            <h3>Inventory List</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{editingItem && editingItem.id === item.id ?
                                <input
                                    type="text"
                                    value={editingItem.name}
                                    onChange={(e) => setEditingItem(prevState => ({ ...prevState, name: e.target.value }))}
                                />
                                : item.name}
                            </td>
                            <td>{editingItem && editingItem.id === item.id ?
                                <input
                                    type="text"
                                    value={editingItem.category}
                                    onChange={(e) => setEditingItem(prevState => ({ ...prevState, category: e.target.value }))}
                                />
                                : item.category}
                            </td>
                            <td>{editingItem && editingItem.id === item.id ?
                                <input
                                    type="number"
                                    value={editingItem.quantity}
                                    onChange={(e) => setEditingItem(prevState => ({ ...prevState, quantity: parseInt(e.target.value) }))}
                                />
                                : item.quantity}
                            </td>
                            <td>
                                {editingItem && editingItem.id === item.id ?
                                    <React.Fragment>
                                        <button onClick={handleUpdateItem}>Save</button>
                                        <button onClick={cancelEdit}>Cancel</button>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <button onClick={() => handleEditItem(item)}>Edit</button>
                                        <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
                                    </React.Fragment>
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    )
}
export default Inventory;
