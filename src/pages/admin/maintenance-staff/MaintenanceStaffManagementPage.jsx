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
const STATUSES = ["Active", "Inactive"];

export default function MaintenanceStaffManagementPage() {

  

  const [users, setUsers] = useState(
    initialUsers.filter(
      (u) => u.role === "Maintenance Staff"
    )
  );


  const [search, setSearch] = useState("");
  const [filterValues, setFilterValues] = useState({});
  const [page, setPage] = useState(1);

  /* =====================================================
     CONFIRM DIALOG
  ===================================================== */

  const [confirmAction, setConfirmAction] = useState(null);

  /* =====================================================
     CREATE / EDIT MODAL
  ===================================================== */

  // undefined = modal closed
  // {} = creating new staff
  // {...user} = editing existing staff
  const [modalUser, setModalUser] = useState(undefined);

  /* =====================================================
     FILTER USERS
  ===================================================== */

  const filtered = useMemo(() => {

    let result = [...users];

    /* Search */
    if (search.trim()) {

      const q = search
        .trim()
        .toLowerCase();

      result = result.filter(
        (u) =>
          u.fullName
            .toLowerCase()
            .includes(q) ||
          u.email
            .toLowerCase()
            .includes(q)
      );
    }

    /* Status filter */
    if (
      filterValues.status &&
      filterValues.status !== "All"
    ) {
      result = result.filter(
        (u) =>
          u.status === filterValues.status
      );
    }

    /* Newest first */
    return result.sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    );

  }, [users, search, filterValues]);

  /* =====================================================
     PAGINATION
  ===================================================== */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filtered.length / PAGE_SIZE
    )
  );

  const paginated = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  /* =====================================================
     SEARCH
  ===================================================== */

  const handleSearchChange = (value) => {

    setSearch(value);

    setPage(1);

  };

  /* =====================================================
     FILTER
  ===================================================== */

  const handleFilterChange = (
    key,
    value
  ) => {

    setFilterValues(
      (previous) => ({
        ...previous,
        [key]: value,
      })
    );

    setPage(1);

  };

  /* =====================================================
     TOGGLE STATUS
  ===================================================== */

  const handleToggleStatus = (user) => {

    setConfirmAction({
      type: "toggle",
      user,
    });

  };

  /* =====================================================
     DELETE
  ===================================================== */

  const handleDelete = (user) => {

    setConfirmAction({
      type: "delete",
      user,
    });

  };

  /* =====================================================
     CONFIRM ACTION
  ===================================================== */

  const runConfirmedAction = () => {

    if (!confirmAction) return;

    const {
      type,
      user,
    } = confirmAction;

    /* Activate / Deactivate */
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

    /* Delete */
    else if (type === "delete") {

      setUsers((previous) =>
        previous.filter(
          (u) => u.id !== user.id
        )
      );

    }

    setConfirmAction(null);

  };

  /* =====================================================
     SAVE MAINTENANCE STAFF
  ===================================================== */

  const handleSaveUser = (user) => {

    /* -------------------------------------------------
       EDIT EXISTING STAFF
    ------------------------------------------------- */

    if (user.id) {

      setUsers((previous) =>
        previous.map((u) =>
          u.id === user.id
            ? {
                ...user,
                role: "Maintenance Staff",
              }
            : u
        )
      );

    }

    /* -------------------------------------------------
       CREATE NEW STAFF
    ------------------------------------------------- */

    else {

      const newUser = {

        ...user,

        role: "Maintenance Staff",

        id: `USR-${Date.now()}`,

        createdAt:
          new Date().toISOString(),

        lastActive:
          new Date().toISOString(),

        status:
          user.status || "Active",
      };

      setUsers((previous) => [
        ...previous,
        newUser,
      ]);

    }

    /* Close modal */

    setModalUser(undefined);

  };

  return (
    <div className="space-y-5">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h1 className="text-xl font-bold text-slate-900">
            Maintenance Staff Management
          </h1>

          <p className="text-sm text-slate-500">
            Manage maintenance staff accounts
          </p>

        </div>

        {/* CREATE BUTTON */}

        <button
          onClick={() =>
            setModalUser({})
          }
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          <UserPlus className="h-4 w-4" />

          Create Maintenance Staff
        </button>

      </div>

      {/* =====================================================
          SEARCH + FILTER
      ===================================================== */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        {/* Search */}

        <div className="w-full sm:w-80">

          <SearchBar
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by name or email..."
          />

        </div>

        {/* Status Filter */}

        <FilterPanel
          filters={[
            {
              key: "status",
              label: "Status",
              options: STATUSES,
            },
          ]}
          values={filterValues}
          onChange={
            handleFilterChange
          }
        />

      </div>

      {/* =====================================================
          TABLE
      ===================================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white">

        {paginated.length === 0 ? (

          <EmptyState
            title="No maintenance staff found"
            message="Try adjusting your search or filters."
          />

        ) : (

          <UserTable
            users={paginated}

            showHallColumn={false}

            onToggleStatus={
              handleToggleStatus
            }

            onDelete={
              handleDelete
            }

            onView={(user) =>
              console.log(
                "View staff:",
                user
              )
            }

            onEdit={(user) =>
              setModalUser(user)
            }

            onResetPassword={(user) =>
              console.log(
                "Reset password:",
                user
              )
            }
          />

        )}

      </div>

      {/* =====================================================
          PAGINATION
      ===================================================== */}

      {filtered.length > 0 && (

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />

      )}

      {/* =====================================================
          CONFIRM DIALOG
      ===================================================== */}

      <ConfirmDialog

        open={!!confirmAction}

        title={
          confirmAction?.type === "delete"

            ? "Delete this staff account?"

            : `${
                confirmAction?.user?.status ===
                "Active"
                  ? "Deactivate"
                  : "Activate"
              } this account?`
        }

        message={
          confirmAction?.type === "delete"

            ? `${confirmAction?.user?.fullName} will be permanently removed. Any active work orders assigned to them should be reassigned first.`

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

      {/* =====================================================
          CREATE / EDIT MODAL
      ===================================================== */}

      <CreateEditUserModal

        open={
          modalUser !== undefined
        }

        initialUser={
          modalUser
        }

        fixedRole="Maintenance Staff"

        onSave={
          handleSaveUser
        }

        onClose={() =>
          setModalUser(undefined)
        }

      />

    </div>
  );
}