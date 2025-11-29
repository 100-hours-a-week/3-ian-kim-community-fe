import FormInput from '@/components/input/FormInput.jsx'
import FormInputGroup from '@/components/input/FormInputGroup.jsx'
import Textarea from '@/components/textarea/Textarea.jsx'
import FormImagePreview from '@/components/image/FormImagePreview.jsx'
import Form from '@/components/form/Form.jsx'

function PostForm({ inputs, headerText, buttonText, onButtonClick, inputsValid }) {
  const [titleInput, contentInput, imageInput] = inputs

  return (
    <>
      <Form headerText={headerText} buttonText={buttonText} onButtonClick={onButtonClick} inputs={inputs} inputsValid={inputsValid}>
        <FormInputGroup labelText={'제목 *'} id={'title'}>
          <FormInput type={'text'} id={'title'} placeholder={'제목을 입력해주세요.'} value={titleInput.value} onChangeInput={titleInput.onChange} />
        </FormInputGroup>

        <FormInputGroup labelText={'내용 *'} id={'content'}>
          <Textarea id={'content'} placeholder={'내용을 입력해주세요.'} value={contentInput.value} onChangeInput={contentInput.onChange} height={'12.5rem'} />
        </FormInputGroup>

        <FormInputGroup labelText={'썸네일'} id={'image'}>
          <FormImagePreview imgSrc={imageInput.imgSrc} onImageClick={imageInput.handleImageClick} imgName={imageInput.imgName} />
          <FormInput ref={imageInput.inputRef} type={'file'} id={'image'} accept='image/*' className={'hidden'} onChangeInput={imageInput.handleImageChange} />
        </FormInputGroup>
      </Form>
    </>
  )
}

export default PostForm
