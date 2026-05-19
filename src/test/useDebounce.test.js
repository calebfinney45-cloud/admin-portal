import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import useDebounce from '../hooks/useDebounce'

describe('useDebounce', () => {
  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 300))
    expect(result.current).toBe('hello')
  })

  it('delays updating the value after delay ms', () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'hello', delay: 300 } }
    )

    expect(result.current).toBe('hello')

    rerender({ value: 'hello world', delay: 300 })

    // Still old value
    expect(result.current).toBe('hello')

    // Advance timers by 300ms
    act(() => {
      vi.advanceTimersByTime(300)
    })

    // Now updated
    expect(result.current).toBe('hello world')

    vi.useRealTimers()
  })

  it('cleans up timeout on unmount', () => {
    vi.useFakeTimers()
    const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout')
    const { unmount } = renderHook(() => useDebounce('test', 300))
    unmount()
    expect(clearTimeoutSpy).toHaveBeenCalled()
    vi.useRealTimers()
  })
})