/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextAreaField,
  TextField,
} from "@aws-amplify/ui-react";
import { StorageManager } from "@aws-amplify/ui-react-storage";
import { Field, getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Note } from "../models";
import { fetchByPath, processFile, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function NoteCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    title: "",
    audio: [],
    createdAt: "",
    label: "",
    transcription: "",
    summary: "",
    favorited: false,
  };
  const [title, setTitle] = React.useState(initialValues.title);
  const [audio, setAudio] = React.useState(initialValues.audio);
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [label, setLabel] = React.useState(initialValues.label);
  const [transcription, setTranscription] = React.useState(
    initialValues.transcription
  );
  const [summary, setSummary] = React.useState(initialValues.summary);
  const [favorited, setFavorited] = React.useState(initialValues.favorited);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setTitle(initialValues.title);
    setAudio(initialValues.audio);
    setCreatedAt(initialValues.createdAt);
    setLabel(initialValues.label);
    setTranscription(initialValues.transcription);
    setSummary(initialValues.summary);
    setFavorited(initialValues.favorited);
    setErrors({});
  };
  const validations = {
    title: [{ type: "Required" }],
    audio: [{ type: "Required" }],
    createdAt: [{ type: "Required" }],
    label: [],
    transcription: [],
    summary: [{ type: "JSON" }],
    favorited: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          title,
          audio,
          createdAt,
          label,
          transcription,
          summary,
          favorited,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(new Note(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "NoteCreateForm")}
      {...rest}
    >
      <TextField
        label={
          <span style={{ display: "inline-flex" }}>
            <span>Title</span>
            <span style={{ color: "red" }}>*</span>
          </span>
        }
        isRequired={true}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title: value,
              audio,
              createdAt,
              label,
              transcription,
              summary,
              favorited,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <Field
        errorMessage={errors.audio?.errorMessage}
        hasError={errors.audio?.hasError}
        label={
          <span style={{ display: "inline-flex" }}>
            <span>Audio</span>
            <span style={{ color: "red" }}>*</span>
          </span>
        }
        isRequired={true}
        isReadOnly={false}
      >
        <StorageManager
          onUploadSuccess={({ key }) => {
            setAudio((prev) => {
              let value = [...prev, key];
              if (onChange) {
                const modelFields = {
                  title,
                  audio: value,
                  createdAt,
                  label,
                  transcription,
                  summary,
                  favorited,
                };
                const result = onChange(modelFields);
                value = result?.audio ?? value;
              }
              return value;
            });
          }}
          onFileRemove={({ key }) => {
            setAudio((prev) => {
              let value = prev.filter((f) => f !== key);
              if (onChange) {
                const modelFields = {
                  title,
                  audio: value,
                  createdAt,
                  label,
                  transcription,
                  summary,
                  favorited,
                };
                const result = onChange(modelFields);
                value = result?.audio ?? value;
              }
              return value;
            });
          }}
          processFile={processFile}
          accessLevel={"private"}
          acceptedFileTypes={["audio/*"]}
          isResumable={false}
          showThumbnails={true}
          maxFileCount={1}
          maxSize={10000000}
          {...getOverrideProps(overrides, "audio")}
        ></StorageManager>
      </Field>
      <TextField
        label={
          <span style={{ display: "inline-flex" }}>
            <span>Created at</span>
            <span style={{ color: "red" }}>*</span>
          </span>
        }
        isRequired={true}
        isReadOnly={false}
        value={createdAt}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              audio,
              createdAt: value,
              label,
              transcription,
              summary,
              favorited,
            };
            const result = onChange(modelFields);
            value = result?.createdAt ?? value;
          }
          if (errors.createdAt?.hasError) {
            runValidationTasks("createdAt", value);
          }
          setCreatedAt(value);
        }}
        onBlur={() => runValidationTasks("createdAt", createdAt)}
        errorMessage={errors.createdAt?.errorMessage}
        hasError={errors.createdAt?.hasError}
        {...getOverrideProps(overrides, "createdAt")}
      ></TextField>
      <TextField
        label="Label"
        isRequired={false}
        isReadOnly={false}
        value={label}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              audio,
              createdAt,
              label: value,
              transcription,
              summary,
              favorited,
            };
            const result = onChange(modelFields);
            value = result?.label ?? value;
          }
          if (errors.label?.hasError) {
            runValidationTasks("label", value);
          }
          setLabel(value);
        }}
        onBlur={() => runValidationTasks("label", label)}
        errorMessage={errors.label?.errorMessage}
        hasError={errors.label?.hasError}
        {...getOverrideProps(overrides, "label")}
      ></TextField>
      <TextField
        label="Transcription"
        isRequired={false}
        isReadOnly={false}
        value={transcription}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              audio,
              createdAt,
              label,
              transcription: value,
              summary,
              favorited,
            };
            const result = onChange(modelFields);
            value = result?.transcription ?? value;
          }
          if (errors.transcription?.hasError) {
            runValidationTasks("transcription", value);
          }
          setTranscription(value);
        }}
        onBlur={() => runValidationTasks("transcription", transcription)}
        errorMessage={errors.transcription?.errorMessage}
        hasError={errors.transcription?.hasError}
        {...getOverrideProps(overrides, "transcription")}
      ></TextField>
      <TextAreaField
        label="Summary"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              audio,
              createdAt,
              label,
              transcription,
              summary: value,
              favorited,
            };
            const result = onChange(modelFields);
            value = result?.summary ?? value;
          }
          if (errors.summary?.hasError) {
            runValidationTasks("summary", value);
          }
          setSummary(value);
        }}
        onBlur={() => runValidationTasks("summary", summary)}
        errorMessage={errors.summary?.errorMessage}
        hasError={errors.summary?.hasError}
        {...getOverrideProps(overrides, "summary")}
      ></TextAreaField>
      <SwitchField
        label="Favorited"
        defaultChecked={false}
        isDisabled={false}
        isChecked={favorited}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              title,
              audio,
              createdAt,
              label,
              transcription,
              summary,
              favorited: value,
            };
            const result = onChange(modelFields);
            value = result?.favorited ?? value;
          }
          if (errors.favorited?.hasError) {
            runValidationTasks("favorited", value);
          }
          setFavorited(value);
        }}
        onBlur={() => runValidationTasks("favorited", favorited)}
        errorMessage={errors.favorited?.errorMessage}
        hasError={errors.favorited?.hasError}
        {...getOverrideProps(overrides, "favorited")}
      ></SwitchField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Create Note"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
