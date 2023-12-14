import Swal from 'sweetalert2';

export const showSuccessAlert = (title, text) => {
  Swal.fire({
    icon: 'success',
    title: title,
    text: text,
    confirmButtonColor: '#1A87DC',
  });
};

export const showErrorAlert = (title, text) => {
  Swal.fire({
    icon: 'error',
    title: title,
    text: text,
    confirmButtonColor: '#F83540',
  });
};