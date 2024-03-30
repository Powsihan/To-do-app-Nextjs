export function validateTask(values) {
    console.log(values)
    let errors = {};

    if (!values.name) {
        errors.name = "Name is Required"
    }
    if (!values.description) {
        errors.description = "Description  is Required"
    }
    

    return errors;
}