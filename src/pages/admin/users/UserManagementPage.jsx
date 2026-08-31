import React, { useMemo, useState } from "react";
import { UserPlus } from "lucide-react";

import { mockUsers as initialUsers } from "../../../mockAdminData";

import UserTable from "../../../components/admin/UserTable";
import CreateEditUserModal from "../../../components/admin/CreateEditUserModal";

import SearchBar from "../../../components/common/SearchBar";
import FilterPanel from "../../../components/common/FilterPanel";
import Pagination from "../../../components/common/Pagination";
import ConfirmDialog from "../../../components/common/ConfirmDialog";
import EmptyState from "../../../components/common/EmptyState";

const PAGE_SIZE = 6;

const ROLES = [
  "Student",
  "Hall Authority",
  "Maintenance Staff",
  "Admin",
];

const STATUSES = ["Active", "Inactive"];

export default function UserManagementPage() {

  // ============================================================
  // STATE
  // ============================================================

  const [users, setUsers] = useState(initialUsers);

  const [search, setSearch] = useState("");

  const [filterValues, setFilterValues] = useState({});

  const [page, setPage] = useState(1);

  // undefined = modal closed
  // {} = create new user
  // {...user} = edit existing user
  const [modalUser, setModalUser] = useState(undefined);

  // { type: "toggle" | "delete", user }
  const [confirmAction, setConfirmAction] = useState(null);


  // ============================================================
  // FILTER + SEARCH
  // ============================================================

  const filtered = useMemo(() => {

    let result = [...users];

    // Search
    if (search.trim()) {

      const q = search.trim().toLowerCase();

      result = result.filter(
        (u) =>
          u.fullName?.toLowerCase().includes(q) ||
          u.email?.toLowerCase().includes(q)
      );
    }

    // Role filter
    if (
      filterValues.role &&
      filterValues.role !== "All"
    ) {
      result = result.filter(
        (u) => u.role === filterValues.role
      );
    }

    // Status filter
    if (
      filterValues.status &&
      filterValues.status !== "All"
    ) {
      result = result.filter(
        (u) => u.status === filterValues.status
      );
    }

    // Newest users first
    return result.sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    );

  }, [users, search, filterValues]);


  // ============================================================
  // PAGINATION
  // ============================================================

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / PAGE_SIZE)
  );

  const paginated = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );


  // ============================================================
  // SEARCH / FILTER HANDLERS
  // ============================================================

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleFilterChange = (key, value) => {

    setFilterValues((previous) => ({
      ...previous,
      [key]: value,
    }));

    setPage(1);
  };


  // ============================================================
  // USER ACTIONS
  // ============================================================

  const handleToggleStatus = (user) => {

    setConfirmAction({
      type: "toggle",
      user,
    });

  };


  const handleDelete = (user) => {

    setConfirmAction({
      type: "delete",
      user,
    });

  };


  // ============================================================
  // CONFIRM ACTION
  // ============================================================

  const runConfirmedAction = () => {

    if (!confirmAction) return;

    const { type, user } = confirmAction;

    // Toggle Active / Inactive
    if (type === "toggle") {

      setUsers((previous) =>
        previous.map((u) =>
          u.id === user.id
            ? {
                ...u,
                status:
                  u.status === "Active"
                    ? "Inactive"
                    : "Active",
              }
            : u
        )
      );
    }

    // Delete user
    if (type === "delete") {

      setUsers((previous) =>
        previous.filter(
          (u) => u.id !== user.id
        )
      );
    }

    setConfirmAction(null);
  };


  // ============================================================
  // SAVE USER
  // ============================================================

  const handleSaveUser = (user) => {

    // Editing existing user
    if (user.id) {

      setUsers((previous) =>
        previous.map((u) =>
          u.id === user.id
            ? user
            : u
        )
      );

    }

    // Creating new user
    else {

      const newUser = {
        ...user,

        id: `USR-${Date.now()}`,

        createdAt:
          new Date().toISOString(),

        lastActive:
          new Date().toISOString(),
      };

      setUsers((previous) => [
        ...previous,
        newUser,
      ]);
    }

    // Close modal
    setModalUser(undefined);

  };


  // ============================================================
  // JSX
  // ============================================================

  return (
    <div className="space-y-5">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h1 className="text-xl font-bold text-slate-900">
            User Management
          </h1>

          <p className="text-sm text-slate-500">
            Manage students, hall authorities,
            maintenance staff, and admins.
          </p>

        </div>

        <button
          type="button"
          onClick={() => setModalUser({})}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          <UserPlus className="h-4 w-4" />
          Create User
        </button>

      </div>


      {/* ======================================================
          SEARCH + FILTERS
      ====================================================== */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <div className="w-full sm:w-80">

          <SearchBar
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by name or email..."
          />

        </div>

        <FilterPanel
          filters={[
            {
              key: "role",
              label: "Role",
              options: ROLES,
            },
            {
              key: "status",
              label: "Status",
              options: STATUSES,
            },
          ]}
          values={filterValues}
          onChange={handleFilterChange}
        />

      </div>


      {/* ======================================================
          USER TABLE
      ====================================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white">

        {paginated.length === 0 ? (

          <EmptyState
            title="No users found"
            message="Try adjusting your search or filters."
          />

        ) : (

          <UserTable
            users={paginated}

            onToggleStatus={
              handleToggleStatus
            }

            onDelete={
              handleDelete
            }

            onView={(user) => {
              console.log("View user:", user);
            }}

            onEdit={(user) => {
              setModalUser(user);
            }}

            onResetPassword={(user) => {
              console.log(
                "Reset password:",
                user
              );
            }}
          />

        )}

      </div>


      {/* ======================================================
          PAGINATION
      ====================================================== */}

      {filtered.length > 0 && (

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />

      )}


      {/* ======================================================
          CREATE / EDIT USER MODAL
      ====================================================== */}

      <CreateEditUserModal
        open={modalUser !== undefined}
        initialUser={modalUser}
        onSave={handleSaveUser}
        onClose={() => setModalUser(undefined)}
      />


      {/* ======================================================
          CONFIRM DIALOG
      ====================================================== */}

      <ConfirmDialog
        open={!!confirmAction}

        title={
          confirmAction?.type === "delete"
            ? "Delete this user?"
            : `${
                confirmAction?.user?.status ===
                "Active"
                  ? "Deactivate"
                  : "Activate"
              } this user?`
        }

        message={
          confirmAction?.type === "delete"
            ? `${confirmAction?.user?.fullName} will be permanently removed. This cannot be undone.`
            : `${confirmAction?.user?.fullName}'s account will be ${
                confirmAction?.user?.status ===
                "Active"
                  ? "deactivated"
                  : "activated"
              }.`
        }

        confirmLabel={
          confirmAction?.type === "delete"
            ? "Delete"
            : "Confirm"
        }

        variant={
          confirmAction?.type === "delete"
            ? "danger"
            : "default"
        }

        onConfirm={
          runConfirmedAction
        }

        onCancel={() =>
          setConfirmAction(null)
        }
      />

    </div>
  );
}