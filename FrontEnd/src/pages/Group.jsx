import  { Component } from 'react';

export class Group extends Component {
    render() {
      return (
    <div className="col-lg-6">
                  <div className="widget-next-match">
                
                  <div className="widget-title" style={{ textAlign: 'center',backgroundColor:"#ee1e46"}}>
                      <h3>Group A</h3>
                  </div>

                    <table className="table custom-table">
                      <thead>
                        <tr>
                          <th>P</th>
                          <th>Team</th>
                          <th>MJ</th>
                          <th>G</th>
                          <th>N</th>
                          <th>P</th>
                          <th>BP</th>
                          <th>BC</th>
                          <th>DB</th>
                          <th>PTS</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>
                            <strong className="text-white">
                              Football League
                            </strong>
                          </td>
                          <td>0</td>
                          <td>0</td>
                          <td>1</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>
                            <strong className="text-white">Soccer</strong>
                          </td>
                          <td>0</td>
                          <td>0</td>
                          <td>1</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>
                            <strong className="text-white">Juvendo</strong>
                          </td>
                          <td>0</td>
                          <td>0</td>
                          <td>1</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>
                            <strong className="text-white">
                              French Football League
                            </strong>
                          </td>
                          <td>0</td>
                          <td>0</td>
                          <td>1</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                        </tr>
                       
                      </tbody>
                    </table>
                  </div>
                </div>
              
  )
}
}
export default Group;