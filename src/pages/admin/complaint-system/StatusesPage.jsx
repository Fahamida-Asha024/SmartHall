import React, { useState } from "react";
import { mockComplaintStatusesConfig } from "../../../mockAdminData";
import ConfigItemList from "../../../components/admin/ConfigItemList";
import ConfigFormModal from "../../../components/admin/ConfigFormModal";
import ConfirmDialog from "../../../components/common/ConfirmDialog";

export default function StatusesPage() {
  const [items, setItems] = useState(mockComplaintStatusesConfig);
  const [modalItem, setModalItem] = useState(undefined);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleSave = (item) => {
    if (item.id) {
      setItems((prev) => prev.map((i) => (i.id === item.id ? item : i)));
    } else {
      setItems((prev) => [...prev, { ...item, id: `ST-${Date.now()}` }]);
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
        title="Complaint Statuses"
        subtitle="Configure the workflow statuses available across the system"
        items={items}
        showDescription={false}
        onAdd={() => setModalItem({})}
        onEdit={setModalItem}
        onToggleActive={handleToggleActive}
        onDelete={setDeleteTarget}
      />

      <ConfigFormModal
        open={modalItem !== undefined}
        initialItem={modalItem}
        showDescription={false}
        onSave={handleSave}
        onClose={() => setModalItem(undefined)}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete this status?"
        message={`"${deleteTarget?.name}" will be permanently removed. Complaints currently in this status should be migrated first.`}
        confirmLabel="Delete"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}