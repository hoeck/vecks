import expect from 'expect'

import Line2 from '../src/Line2'
import V2 from '../src/V2'
import { expectV2Equal } from './util'

describe('Line2', function () {
  it('expects V2 instances', function () {
    expect(function () {
      new Line2() // eslint-disable-line no-new
    }).toThrow('expected first argument to be an instance of vecks.V2')
    expect(function () {
      new Line2(new V2()) // eslint-disable-line no-new
    }).toThrow('expected second argument to be an instance of vecks.V2')
  })

  it('has a length', function () {
    const a = new Line2(new V2(0, 0), new V2(1, 0))
    expect(a.length()).toEqual(1)
  })

  it('can caculate intersections', function () {
    expect(function () {
      new Line2(new V2(0, 0), new V2(1, 0)).getIntersection([]) // eslint-disable-line no-new
    }).toThrow('expected argument to be an instance of vecks.Line2')

    expect(new Line2(new V2(0, 0), new V2(1, 0))
      .getIntersection(new Line2(new V2(0, 0), new V2(1, 0))))
      .toEqual(null)

    expectV2Equal(new Line2(new V2(0, 0), new V2(1, 1))
      .getIntersection(new Line2(new V2(0, 1), new V2(1, 0))),
      new V2(0.5, 0.5))
  })
})