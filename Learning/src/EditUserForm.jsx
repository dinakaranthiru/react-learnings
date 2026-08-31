import { useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useEffect } from 'react';
import useStore from './store/useStore';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from './api/updateUser';



export default function EditUserForm() {
  const selectedUser = useStore((state) => state.selectedUser);
  const clearSelectedUser = useStore((state)=> state.clearSelectedUser)

  const { register, handleSubmit, reset ,formState: { errors },} = useForm();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (selectedUser) {
      reset(selectedUser);
    }
  }, [selectedUser, reset]);

  // Mutation
  const mutation = useMutation({
  mutationFn: updateUser,
  onSuccess: (updatedUser) => {

    queryClient.setQueryData(["users"], (oldUsers) => {
      return oldUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
    });

  },
});
  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  if (!selectedUser) return <p>Select a user to edit</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
     <div>
  <label>Name:</label>
  <InputText
    {...register("name", {
      required: "Name is required!!"
    })}
  />

  {errors.name && (
    <small style={{ color: "red" }}>
      {errors.name.message}
    </small>
  )}
</div>

      <div>
        <label>Email:</label>
        <InputText {...register("email",{
          required:"Email is Required!!"
        })} />
        {errors.email && (<small style={{color:"red"}}>{errors.email.message}</small>)}
      </div>

      <Button type="submit" label="Update User" className="p-mt-2" />
      <Button
        type="button"
        label="Close"
        className="p-button-secondary"
        onClick={clearSelectedUser}
      />
    </form>
  );
}