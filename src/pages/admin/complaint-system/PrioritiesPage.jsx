import React, { useState } from "react";
import { mockPriorityLevels } from "../../../mockAdminData";
import ConfigItemList from "../../../components/admin/ConfigItemList";
import ConfigFormModal from "../../../components/admin/ConfigFormModal";
import ConfirmDialog from "../../../components/common/ConfirmDialog";

export default function PrioritiesPage() {
  const [items, setItems] = useState(mockPriorityLevels);
  const [modalItem, setModalItem] = useState(undefined);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleSave = (item) => {
    if (item.id) {
      setItems((prev) => prev.map((i) => (i.id === item.id ? item : i)));
    } else {
      setItems((prev) => [...prev, { ...item, id: `PR-${Date.now()}` }]);
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
        title="Priority Levels"
        subtitle="Define the priority levels Hall Authorities use when managing complaints"
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
        title="Delete this priority level?"
        message={`"${deleteTarget?.name}" will be permanently removed.`}
        confirmLabel="Delete"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}