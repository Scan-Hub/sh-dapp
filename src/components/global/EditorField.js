import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import YupErrorMessage from "./YupErrorMessage";

const EditorField = ({ onEditorChange, placeholder, name, value, error }) => {
  const configEditor = {
    selector: "textarea",
    auto_focus: false,
    resize: true,
    toolbar_mode: "floating",
    min_height: 350,
    fontsize_formats: "8px 10px 12px 14px 16px 18px 24px 36px 48px",
    skin: "oxide",
    content_css: "dark",
    menubar: false,
    plugins: [
      "image code",
      "advlist autolink lists link image charmap print preview anchor",
      "searchreplace visualblocks code fullscreen",
      "insertdatetime media table paste code help wordcount",
    ],
    toolbar:
      "undo redo | formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | image | help | fullscreen code",
    content_style:
      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }" +
      "p{ padding:0px; margin:0px; }" +
      ".mce-content-body:not([dir='rtl']) blockquote{border-left:1px solid #ccc}" +
      ".tox .tox-editor-header {position:fixed;bottom:18px}",
    image_title: true,
    /* enable automatic uploads of images represented by blob or data URIs*/
    automatic_uploads: true,
    /*
        URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
        images_upload_url: 'postAcceptor.php',
        here we add custom filepicker only to Image dialog
      */
    file_picker_types: "file image media",
    /* and here's our custom image picker*/
    file_picker_callback: function (cb, value, meta) {
      var input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
  
      /*
        Note: In modern browsers input[type="file"] is functional without
        even adding it to the DOM, but that might not be the case in some older
        or quirky browsers like IE, so you might want to add it to the DOM
        just in case, and visually hide it. And do not forget do remove it
        once you do not need it anymore.
      */
  
      input.onchange = function () {
        var file = this.files[0];
  
        var reader = new FileReader();
        reader.onload = function () {
          /*
            Note: Now we need to register the blob in TinyMCEs image blob
            registry. In the next release this part hopefully won't be
            necessary, as we are looking to handle it internally.
          */
          var id = 'blobid' + (new Date()).getTime();
          var blobCache =  window.tinymce.activeEditor.editorUpload.blobCache;
          var base64 = reader.result.split(',')[1];
          var blobInfo = blobCache.create(id, file, base64);
          blobCache.add(blobInfo);
  
          /* call the callback and populate the Title field with the file name */
          cb(blobInfo.blobUri(), { title: file.name });
        };
        reader.readAsDataURL(file);
      };
  
      input.click();
    },
  };

  return (
    <div className="w-full relative">
      <Editor
        name={name}
        language="en"
        key={"description"}
        value={value}
        init={configEditor}
        placeholder={placeholder}
        onEditorChange={onEditorChange}
        apiKey={process.env.REACT_APP_KEY_TINYMCE}
        tinymceScriptSrc={`${process.env.PUBLIC_URL}/tinymce/tinymce.min.js`}
      />
      {error && <YupErrorMessage message={error.message} />}
    </div>
  );
};

export default EditorField;
