import { useState, useMemo } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { Modal, Switch, Button, Group } from "@mantine/core";
import Loader from "../../../../ui/Loader";
import { GiConfirmed } from "react-icons/gi";
import { MdOutlineNotInterested } from "react-icons/md";
import Input from "../../components/Input";

const UserTable = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [registerModalOpened, setRegisterModalOpened] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [newUser, setNewUser] = useState({
    name: "",
    surname: "",
    patronymic: "",
    email: "",
    login: "",
    isAdmin: false,
    isConfirmed: false,
  });

  const columns = useMemo(
    () => [
      { accessorKey: "surname", header: "Фамилия" },
      { accessorKey: "name", header: "Имя" },
      { accessorKey: "patronymic", header: "Отчество" },
      { accessorKey: "email", header: "Почта" },
      { accessorKey: "login", header: "Логин" },
      {
        accessorKey: "isAdmin",
        header: "Админ",
        Cell: ({ cell }) => (
          <span className="flex justify-center">
            {cell.getValue() ? (
              <GiConfirmed className="text-green-500" />
            ) : (
              <MdOutlineNotInterested className="text-red-500" />
            )}
          </span>
        ),
      },
      {
        accessorKey: "isConfirmed",
        header: "Подтвержден",
        Cell: ({ cell }) => (
          <span className="flex justify-center">
            {cell.getValue() ? (
              <GiConfirmed className="text-green-500" />
            ) : (
              <MdOutlineNotInterested className="text-red-500" />
            )}
          </span>
        ),
      },
      {
        header: "Действие",
        Cell: ({ row }) => (
          <div className="flex justify-center">
            <button
              className="text-blue-500 hover:underline"
              onClick={() => openModal(row.original)}
            >
              {" "}
              Изменить{" "}
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useMantineReactTable({ columns, data: users || [] });

  const openModal = (user) => {
    setSelectedUser(user);
    setEditedUser(user);
    setModalOpened(true);
  };

  const openRegisterModal = () => {
    setNewUser({
      name: "",
      surname: "",
      patronymic: "",
      email: "",
      login: "",
      isAdmin: false,
      isConfirmed: false,
    });
    setRegisterModalOpened(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    console.log(editedUser);
    setModalOpened(false);
  };

  const handleRegister = () => {
    console.log("Новый пользователь:", newUser);
    setRegisterModalOpened(false);
  };

  return (
    <>
      {!users ? (
        <Loader />
      ) : (
        <>
          <MantineReactTable
            table={table}
            className="rounded-lg shadow-lg overflow-hidden"
          />

          <Button
            onClick={openRegisterModal}
            className="flex justify-center rounded-md px-3 py-2 text-sm font-semibold w-auto bg-sky-500 text-white hover:bg-sky-600 mb-4 mt-4"
          >
            Создать нового пользователя
          </Button>
        </>
      )}

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title={
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Редактирование пользователя
          </h2>
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        className="p-5 bg-white rounded-lg shadow-lg"
        size="lg"
      >
        <p className="text-sm text-gray-600 mb-4">
          Здесь вы можете изменить данные пользователя
        </p>

        {selectedUser && (
          <div className="space-y-4">
            {["name", "surname", "patronymic", "email", "login"].map(
              (field) => (
                <div key={field}>
                  <label className="text-sm text-gray-700">
                    {field === "name"
                      ? "Имя"
                      : field === "surname"
                      ? "Фамилия"
                      : field === "patronymic"
                      ? "Отчество"
                      : field === "email"
                      ? "Email"
                      : "Логин"}
                  </label>
                  <input
                    label={field === "name" ? "Имя" : field}
                    name={field}
                    type={field === "email" ? "email" : "text"}
                    value={editedUser[field] || ""}
                    onChange={handleEditChange}
                    className="border border-gray-900/10 rounded px-2 py-1 w-full"
                  />
                </div>
              )
            )}
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">
                Статус пользователя
              </label>
              <Switch
                size="lg"
                checked={!!editedUser.isConfirmed} // Приводим к булевому значению
                onChange={(event) =>
                  setEditedUser((prev) => ({
                    ...prev,
                    isConfirmed: event.currentTarget.checked,
                  }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Администратор</label>
              <Switch
                size="lg"
                checked={!!editedUser.isAdmin} // Приводим к булевому значению
                onChange={(event) =>
                  setEditedUser((prev) => ({
                    ...prev,
                    isAdmin: event.currentTarget.checked,
                  }))
                }
              />
            </div>

            <Group position="right">
              <Button onClick={handleSave} color="blue">
                Сохранить изменения
              </Button>
            </Group>
          </div>
        )}
      </Modal>

      <Modal
        opened={registerModalOpened}
        onClose={() => setRegisterModalOpened(false)}
        title={
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Добавление нового пользователя
          </h2>
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        className="p-5 bg-white rounded-lg shadow-lg"
        size="lg"
      >
        <p className="text-sm text-gray-600 mb-4">
          Введите данные нового пользователя
        </p>

        <div className="space-y-4">
          {["name", "surname", "patronymic", "email", "login"].map((field) => (
            <div key={field}>
              <label className="text-sm text-gray-700">
                {field === "name" ? "Имя" : field}
              </label>
              <Input
                label={field === "name" ? "Имя" : field}
                name={field}
                type={field === "email" ? "email" : "text"}
                value={newUser[field]}
                onChange={handleRegisterChange}
                className="border border-gray-900/10 rounded px-2 py-1 w-full"
              />
            </div>
          ))}
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-700">Администратор</label>
            <Switch
              size="lg"
              checked={newUser.isAdmin}
              onChange={(event) =>
                setNewUser((prev) => ({
                  ...prev,
                  isAdmin: event.currentTarget.checked,
                }))
              }
            />
          </div>

          <Group position="right">
            <Button onClick={handleRegister}>Зарегистрировать</Button>
          </Group>
        </div>
      </Modal>
    </>
  );
};

export default UserTable;
