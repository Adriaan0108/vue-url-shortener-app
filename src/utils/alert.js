import Swal from "sweetalert2";

export function showErrorAlert(message) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
    confirmButtonColor: "#d33",
  });
}

export function showSuccessAlert(message) {
  Swal.fire({
    icon: "success",
    title: "Success!",
    text: message,
    confirmButtonColor: "#28a745",
  });
}
