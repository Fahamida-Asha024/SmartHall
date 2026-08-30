import React, { useState } from "react";
import { mockCategories } from "../../../mockAdminData";
import ConfigItemList from "../../../components/admin/ConfigItemList";
import ConfigFormModal from "../../../components/admin/ConfigFormModal";
import ConfirmDialog from "../../../components/common/ConfirmDialog";

export default function CategoriesPage() {
  const [items, setItems] = useState(mockCategories);
  const [modalItem, setModalItem] = useState(undefined); // undefined = closed, {} = new, {...} = edit
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleSave = (item) => {
    if (item.id) {
      setItems((prev) => prev.map((i) => (i.id === item.id ? item : i)));
    } else {
      setItems((prev) => [...prev, { ...item, id: `CAT-${Date.now()}` }]);
    }
    setModalItem(undefined);
  };

  const handleToggleActive = (item) => {
    setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, active: !i.active } : i)));
  };

  const handleDelete = () => {
    setItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <>
      <ConfigItemList
        title="Complaint Categories"
        subtitle="Manage the categories students can select when submitting a complaint"
        items={items}
        onAdd={() => setModalItem({})}
        onEdit={setModalItem}
        onToggleActive={handleToggleActive}
        onDelete={setDeleteTarget}
      />

      <ConfigFormModal
        open={modalItem !== undefined}
        initialItem={modalItem}
        onSave={handleSave}
        onClose={() => setModalItem(undefined)}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete this category?"
        message={`"${deleteTarget?.name}" will be permanently removed. Complaints already using it are unaffected.`}
        confirmLabel="Delete"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}