import { FieldValues, UseFormReturn } from "react-hook-form"
import { toast } from "sonner"
import { TYPE_API_ERROR, ErrorSource } from "./definitions"

export function translateErrors(errors: TYPE_API_ERROR[]) {
  // Map out errors given by Backend response
  const translatedErrors = errors.map((error) => {
    return {
      code: error?.code ?? undefined, // e.g "invalid type"
      message: error.message, // e.g "Account already exists"
      path: error?.path
        ? error?.path.map((path) => path).join(".") // Join nested paths
        : undefined, // Form field
    }
  })

  return translatedErrors
}

export function printErrors(
  error: {
    path: string | undefined
    message: string
    code: string | undefined
  },
  label: string = "OK",
  action?: () => void,
) {
  toast.error(error.message, {
    description: (
      <div>
        {error.code ? (
          <p>
            <span className="font-bold">Code: </span>
            {error.code}
          </p>
        ) : null}
        {error.path ? (
          <p>
            <span className="font-bold">Path: </span>
            {error.path}
          </p>
        ) : null}
      </div>
    ),
    action: {
      label: label,
      onClick: () => action,
    },
    duration: 5000,
  })
}

export function translateAndDisplayErrors<T extends FieldValues>(
  errors: TYPE_API_ERROR[],
  form?: UseFormReturn<T>,
) {
  const translatedErrors = translateErrors(errors)
  translatedErrors.forEach((error) => {
    if (error.path && error.message && form) {
      form.setError(error.path as any, {
        message: error.message,
      })
    } else {
      printErrors(error)
    }
  })
}

export function handleErrors<T extends FieldValues>(
  error: string | TYPE_API_ERROR[],
  source: ErrorSource,
  form?: UseFormReturn<T>,
) {
  if (source === ErrorSource.CAUGHT)
    toast.error("Something went wrong", {
      description: "Try again or contact support.",
    })

  if (source === ErrorSource.API) {
    translateAndDisplayErrors<T>(error as TYPE_API_ERROR[], form)
  }

  if (source === ErrorSource.SESSION && typeof error === "string")
    toast.error(error)
}


// Server side
export function checkAndThrowError(error: TYPE_API_ERROR[] | string, source: ErrorSource) {
  if (source === ErrorSource.CAUGHT || source === ErrorSource.SESSION) {
    throw new Error(typeof error === "string" ? error : "Something went wrong")
  } else if (source === ErrorSource.API) {
    const translatedErrors = translateErrors(error as TYPE_API_ERROR[])
    throw new Error(`Error: ${translatedErrors[0].message}`)
  }
}
