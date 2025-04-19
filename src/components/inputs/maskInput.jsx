import React, { useEffect, useRef, useState } from 'react'
import IMask from 'imask'
import { cn } from '@/lib/utils'

// Configuração padrão para máscara de dinheiro
const moneyConfig = {
  mask: Number,
  radix: '.',
  scale: 2,
  signed: false,
  thousandsSeparator: '',
  padFractionalZeros: true,
  normalizeZeros: true,
  mapToRadix: [','],
  prefix: 'R$ ',
  suffix: '',
  min: null,
  max: null,
}

/**
 * Input React com suporte a máscara, dinheiro e cor
 */
export function MaskInput({
  // Props do Vue convertidas
  size = 'default',
  success = false,
  error = false,
  icon = '',
  iconDir = '',
  name = '',
  id = '',
  value = '',
  placeholder = '',
  type = 'text',
  isRequired = false,
  dataMaska = '',
  dataMaskaTokens = '',
  money = false,
  phone = false,
  color = false,
  inputClass = '',
  disable = false,
  // Eventos
  onChange,
  onBlur,
  onChangeColor,
  // Slots
  leftSlot,
  rightSlot,
}) {
  const inputRef = useRef(null)
  const [phoneMask, setPhoneMask] = useState('(00)0000-0000')

  // Gera classes de validação e tamanho
  const getClasses = () => {
    const sizeClass = size ? `form-control-${size}` : ''
    const validClass = error ? 'is-invalid' : success ? 'is-valid' : ''
    return `${sizeClass} ${validClass} ${inputClass}`.trim()
  }

  // Ajusta a máscara de telefone dinamicamente
  useEffect(() => {
    if (phone && value.length >= 5) {
      const d = value[4]
      setPhoneMask(d === '9' ? '(00)00000-0000' : '(00)0000-0000')
    }
  }, [value, phone])

  // Inicializa IMask com base nas props
  useEffect(() => {
    if (!inputRef.current) return
    let maskInstance
    if (money) {
      maskInstance = IMask(inputRef.current, moneyConfig)
    } else if (phone) {
      maskInstance = IMask(inputRef.current, { mask: phoneMask })
    } else if (dataMaska) {
      let tokens = {}
      try { tokens = dataMaskaTokens ? JSON.parse(dataMaskaTokens) : {} } catch {
        console.error('Erro ao parsear tokens')
      }
      maskInstance = IMask(inputRef.current, { mask: dataMaska, tokens })
    }
    return () => maskInstance?.destroy()
  }, [money, phone, phoneMask, dataMaska, dataMaskaTokens])

  // Handlers
  const handleInput = (e) => onChange?.(e.target.value)
  const handleBlur = (e) => onBlur?.(e.target.value)
  const handleColor = (e) => {
    onChangeColor?.(e.target.value)
    onChange?.(e.target.value)
  }

  // Classes base do input
  const baseClasses =
    'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium ' +
    'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ' +
    'disabled:cursor-not-allowed disabled:opacity-50'

  return (
    <div className="form-group">
      <div className="flex items-center">
        {leftSlot}
        {iconDir === 'left' && (
          <span className="input-group-text">
            <i className={icon} />
          </span>
        )}

        {color ? (
          <input
            ref={inputRef}
            type="color"
            id={id}
            name={name}
            value={value}
            onChange={handleColor}
            className={cn(baseClasses, getClasses())}
            disabled={disable}
          />
        ) : (
          <input
            ref={inputRef}
            id={id}
            name={name}
            type={type}
            value={value}
            placeholder={placeholder}
            required={isRequired}
            onInput={handleInput}
            onBlur={handleBlur}
            className={cn(baseClasses, getClasses())}
            disabled={disable}
          />
        )}

        {iconDir === 'right' && (
          <span className="input-group-text">
            <i className={icon} />
          </span>
        )}
        {rightSlot}
      </div>
    </div>
  )
}
